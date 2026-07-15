export async function POST(request) {
  try {
    const body = await request.json();
    const { name, category, notes, photos, valuationTip, mode } = body;

    const content = [];
    const photosToSend = mode === 'quick' ? (photos || []).slice(0, 1) : (photos || []);
    photosToSend.forEach((photo) => {
      const base64 = photo.split(',')[1];
      content.push({ type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: base64 } });
    });

    const hasName = !!(name && name.trim());
    const identificationInstruction = hasName
      ? 'Identify this item as specifically as possible (brand, model, style if visible in the photo), using the name given above as a starting point but verifying and refining it against what is actually visible in the photo(s).'
      : 'No name or description was provided for this item - you must identify it purely from the photo(s). Look closely for brand names, logos, model names, engravings, or text visible anywhere in the photos, and use that to identify the specific brand and model as precisely as you can.';

    const tipNote = valuationTip && valuationTip.trim()
      ? `\n\nCRITICAL - the person who owns this item has given you this first-hand guidance, and it should be your PRIMARY anchor for the valuation, overriding generic search results where they conflict: "${valuationTip.trim()}". If this guidance includes a specific value or price, your estimate must be centered on that figure unless you find strong, specific, directly-contradicting evidence.`
      : '';

    const siteScopeInstruction = mode === 'quick'
      ? "Search eBay and Trade Me (trademe.co.nz, New Zealand's main second-hand marketplace) for what this item typically sells for second-hand - just these two sites is fine for a quick check."
      : "Search multiple resale marketplaces worldwide for what this item typically sells for second-hand. Always check eBay and Trade Me as a baseline, and also check other major marketplaces relevant to this specific type of item (Chrono24 for watches, Vestiaire Collective/Depop/Poshmark/Grailed for clothing, Facebook Marketplace/Gumtree for general secondhand goods, etc).";

    const currencyInstruction = mode === 'quick'
      ? 'All prices must end up in New Zealand dollars (NZD): convert using your best approximate knowledge of current exchange rates rather than searching for an exact live rate.'
      : "All prices must end up converted to New Zealand dollars (NZD): look up today's exchange rate and convert accurately, noting in your reasoning which currencies you converted from.";

    const promptText =
      (hasName ? `Item name: ${name}` : 'Item name: (not provided - identify from photo)') +
      (category ? `\nCategory: ${category}` : '') +
      (notes ? `\nNotes/condition: ${notes}` : '') +
      tipNote +
      `\n\n${identificationInstruction} ${siteScopeInstruction} ${currencyInstruction} ` +
      "Also search for the current new retail price (RRP) today if still sold new, converted to NZD - null if discontinued or unknown. " +
      "Then draft a listing styled for Facebook Marketplace: casual, first person, honest, 2-4 short paragraphs separated by a blank line, ending with a casual line inviting messages. " +
      "IMPORTANT: Respond with ONLY a raw JSON object, no markdown fences, no commentary, starting with { and ending with }, in exactly this shape: " +
      '{"identified_item":"string","identified_category":"string","estimate_low":number,"estimate_high":number,"currency":"NZD","suggested_price":number,"new_price":number|null,"sources_checked":["string"],"listing_title":"string","listing_description":"string","reasoning":"string"}';

    content.push({ type: 'text', text: promptText });

    const maxAttempts = mode === 'quick' ? 1 : 2;
    let parsed = null;
    let lastError = null;

    for (let attempt = 0; attempt < maxAttempts && !parsed; attempt++) {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 2000,
          messages: [{ role: 'user', content }],
          tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        lastError = new Error(data?.error?.message || `API error (${response.status})`);
        continue;
      }

      const textBlocks = (data.content || [])
        .filter((b) => b.type === 'text')
        .map((b) => b.text)
        .join('\n');

      const cleaned = textBlocks.replace(/```json|```/g, '').trim();
      const jsonStart = cleaned.indexOf('{');
      const jsonEnd = cleaned.lastIndexOf('}');
      if (jsonStart === -1 || jsonEnd === -1) {
        lastError = new Error('No JSON found in response');
        continue;
      }
      try {
        parsed = JSON.parse(cleaned.slice(jsonStart, jsonEnd + 1));
      } catch (e) {
        lastError = new Error('JSON parse failed: ' + e.message);
      }
    }

    if (!parsed) {
      return Response.json({ error: lastError ? lastError.message : 'Valuation failed' }, { status: 500 });
    }

    return Response.json({ result: parsed });
  } catch (err) {
    return Response.json({ error: err.message || 'Unexpected server error' }, { status: 500 });
  }
}

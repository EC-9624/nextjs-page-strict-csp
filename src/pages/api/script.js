(async () => {
  const inlineScripts = [...document.querySelectorAll("script:not([src])")];

  for (const [index, script] of inlineScripts.entries()) {
    const scriptContent = script.textContent;

    if (scriptContent && !script.nonce) {
      // Log script index and content
      console.log(`Inline Script ${index + 1}:`);
      console.log(scriptContent);

      // Generate SHA-256 hash
      const encoder = new TextEncoder();
      const data = encoder.encode(scriptContent);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const base64Hash = btoa(
        String.fromCharCode(...hashArray.map((byte) => byte))
      );

      console.log(`'sha256-${base64Hash}'`);
    }
  }
})();

[...document.querySelectorAll("script:not([src])")].forEach((script, index) => {
  console.log(`Inline Script ${index + 1}:`);
  console.log("nonce:", script.nonce);
  console.log(script.textContent);
});

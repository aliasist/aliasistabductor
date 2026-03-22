export interface Env {
	AI: any;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (request.method !== "POST") return new Response("Use POST", { status: 405 });

		try {
			const { prompt } = await request.json() as { prompt: string };

			// 1. Get the AI response
			const aiResponse: any = await env.AI.run(
				"@cf/black-forest-labs/flux-1-schnell",
				{ prompt: prompt }
			);

			// 2. The critical step: Convert Base64 text to Binary pixels
			// This turns "/9j/..." into raw image data
			const binaryString = atob(aiResponse.image);
			const imgBytes = new Uint8Array(binaryString.length);
			for (let i = 0; i < binaryString.length; i++) {
				imgBytes[i] = binaryString.charCodeAt(i);
			}

			// 3. Return the REAL image data
			return new Response(imgBytes, {
				headers: {
					"content-type": "image/jpeg",
					"Access-Control-Allow-Origin": "*",
				},
			});

		} catch (e: any) {
			return new Response(`Error: ${e.message}`, { status: 500 });
		}
	},
};

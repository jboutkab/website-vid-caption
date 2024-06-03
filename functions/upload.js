// functions/upload.js
export async function onRequest(context) {
  const contextDetails = JSON.stringify(context, null, 2);
  console.log(contextDetails)
    const { request } = context;
       const formData = await request.formData();
      const file = formData.get('video');
  
      if (file) {
        const blob = await file.arrayBuffer();
          const input = {
              audio:[...new Uint8Array(blob)]
          }
  
        /*Save the file or pass it to Workers AI
        const result = await fetch('https://<workers-ai-endpoint>/caption', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Length': buffer.length
          },
          body: buffer
        });
        */
        const response = await context.env.AI.run('@cf/openai/whisper', input);
  
        //return Response.json({ input: { audio: [] }, response });
        return new Response(JSON.stringify(response.text))
         // return Response.json({input:"kk"})
      } else {
        return new Response('No video file uploaded', { status: 400 });
      }
  
  }
  
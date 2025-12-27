// 'use client'

// import React, { useState } from 'react'
// import { KhaleelEditor, KhaleelRenderer } from 'khaleel-editor'
// import 'khaleel-editor/dist/khaleel-editor.css' 
// import { json } from 'stream/consumers'

// export default function EditorPage() {
//   const [debugOutput, setDebugOutput] = useState('')
//   const [contentJson, setContentJson] = useState<any>(null)
//   const handleUpload = async (file: File): Promise<string> => {
//     const formData = new FormData();
//     formData.append('file', file);

//     const response = await fetch('/api/upload', {
//       method: 'POST',
//       body: formData,
//     });

//     const data = await response.json();
//     return data.url; 
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-10 font-sans">
//       <div className="bg-white p-6 rounded-xl shadow-sm">
        
//         <h1 className="text-3xl font-bold mb-6 text-gray-800">
//           Khaleel CMS Editor
//         </h1>

//         <KhaleelEditor 
//           initialContent="<p>Drag an image here!</p>"
//           onSave={(json: any) => {
//             setDebugOutput(JSON.stringify(json, null, 2));
//             setContentJson(json)
//           }}
//           onUpload={handleUpload} 
//         />

//         <div className="mt-8 p-4 bg-gray-900 text-green-400 rounded-lg overflow-auto">
//           <h3 className="text-sm uppercase text-gray-500 mb-2">Live JSON Output:</h3>
//           <pre className="text-xs whitespace-pre-wrap font-mono">
//             {debugOutput || "Type something above..."}
//           </pre>
//         </div>

//       </div>
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//         <h2 className="text-xl font-bold mb-4 text-blue-600">Website Preview</h2>
        
//         {contentJson ? (
//            <KhaleelRenderer content={contentJson} />
//         ) : (
//            <p className="text-gray-400">Type something to see the preview...</p>
//         )}
//       </div>
//     </div>
//   )
// }
import express from "express"
import fetch from "node-fetch"
import path from "path"

const app = express()

const PORT = process.env.PORT || 3000
const API_KEY = process.env.AI_KEY

app.use(express.static("public"))

app.get("/api/wish", async (req,res)=>{

    try{

        const prompt = `
Viết 1 lời chúc ngắn dễ thương dành cho Nhi.
Tối đa 20 từ.
Giọng văn vui vẻ.
Không đánh số.
`

        const r = await fetch("https://api.sambanova.ai/v1/chat/completions",{
            method:"POST",
            headers:{
                "Authorization":`Bearer ${API_KEY}`,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                model:"Meta-Llama-3.1-8B-Instruct",
                messages:[
                    {role:"user",content:prompt}
                ],
                temperature:0.9
            })
        })

        const data = await r.json()

        const text = data.choices?.[0]?.message?.content || "Chúc Nhi luôn vui vẻ mỗi ngày."

        res.json({text})

    }catch(e){
        res.json({text:"Chúc Nhi luôn hạnh phúc và gặp nhiều may mắn."})
    }

})

app.listen(PORT,()=>{
    console.log("server running")
})

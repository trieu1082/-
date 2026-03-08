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
Viết một lời chúc NGẮN cho Nhi.
Phong cách dễ thương, tích cực.
Không được lặp lại câu quen thuộc.
Tối đa 18 từ.
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
  {role:"system",content:"Bạn là AI chuyên viết lời chúc sáng tạo"},
  {role:"user",content: prompt + " " + Math.random()}
 ],
 temperature:1,
 top_p:0.9,
 presence_penalty:0.6,
 frequency_penalty:0.6
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

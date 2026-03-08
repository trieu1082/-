import express from "express"

const app = express()

const PORT = process.env.PORT || 3000
const API_KEY = process.env.AI_KEY

app.use(express.static("public"))

const used = new Set()

app.get("/api/wish", async (req,res)=>{

try{

const prompt = `
Viết một lời chúc NGẮN cho Nhi.
Phong cách dễ thương, tích cực.
KHÔNG được lặp lại các lời chúc trước đó.
Tối đa 18 từ.
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
{role:"system",content:"Bạn là AI chuyên viết lời chúc sáng tạo"},
{role:"user",content: prompt + " " + Math.random()}
],
temperature:1,
top_p:0.9,
presence_penalty:0.7,
frequency_penalty:0.7
})
})

const data = await r.json()

let text = data?.choices?.[0]?.message?.content?.trim()

if(!text){
text = "Mong hôm nay của Nhi đầy tiếng cười và những điều dễ thương."
}

if(used.has(text)){
text = "Hy vọng hôm nay Nhi gặp thật nhiều điều khiến bạn mỉm cười."
}

used.add(text)

if(used.size > 200){
used.clear()
}

res.json({text})

}catch(e){

res.json({
text:"Chúc Nhi một ngày nhẹ nhàng và đầy niềm vui."
})

}

})

app.listen(PORT,()=>{
console.log("len r thang cu m",PORT)
})

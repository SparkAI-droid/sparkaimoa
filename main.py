import json
from workers import WorkerEntrypoint, Response

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        path = request.url

        if "/api/chat" in path and request.method == "POST":
            b = await request.json()
            return Response(json.dumps({"reply": f"Received: {b.get('prompt')}"}), headers={"Content-Type": "application/json"})

        if "/api/img" in path and request.method == "POST":
            b = await request.json()
            return Response(json.dumps({"url": "https://via.placeholder.com/512/00f2fe/ffffff?text=Image"}), headers={"Content-Type": "application/json"})

        with open("index.html", "r") as f:
            return Response(f.read(), headers={"Content-Type": "text/html"})

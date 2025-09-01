# Backend (.NET)

This is the **stateless backend service** built with **ASP.NET Core**.  
It is responsible for:
- User authentication (login, register, change password)
- Fetching chat history
- Interacting with the database

---

## 🚀 Tech Stack
- ASP.NET Core (C#)
- Entity Framework Core
- NoSQL database (MongoDB / TBD)

---

## 📂 Project Structure
- ChatApp.API/ → Controllers (Auth, ChatHistory)
- ChatApp.Domain/ → Entities & business rules
- ChatApp.Infrastructure/ → Database, repositories
- ChatApp.Application/ → Application services
- ChatApp.sln → Solution file

---

## ▶️ Run the Project
```bash
cd backend-dotnet/ChatApp.API
dotnet run


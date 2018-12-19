const exp=require('express');

const socketIO=require('socket.io');
const http=require('http');

const path=require('path');
const pub=path.join(__dirname,'../public');

const port=process.env.PORT || 5000;
var app=exp();
app.use(exp.static(pub));

var server=http.createServer(app);
var io=socketIO(server);

io.on('connection',(socket)=>{
    console.log('User connected');
    
    socket.broadcast.emit('newMessage',{
            from:'Admin',
            text:'New user joined',
            createdAt:new Date().getTime()
    });
    
    socket.emit('newMessage',{
            from:'Admin',
            text:'Welcome to chat app!!!',
            createdAt:new Date().getTime()
    });
    
    socket.on('createMessage',(newMsg)=>{
        console.log('createMessage',newMsg);
        
        
        
        /*io.emit('newMessage',{
            from:newMsg.from,
            text:newMsg.text,
            createdAt:new Date().getTime()
        }); */          
    });
    
    socket.on('disconnect',()=>{
        console.log('User disconnected');
    });
});

server.listen(port,()=>{
    console.log(`Started on port ${port}`);
});

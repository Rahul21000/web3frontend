import {Express } from "express";
import controller from '../controllers/user.controller';
const routes=(app:Express)=>{
    app.get('/api/user',controller.getAllUserHandler);
    app.get('/api/user/:id',controller.getUserHandler);
    app.post('/api/user',controller.createUserHandler);
    app.put('/api/user/:id',controller.updateUserHandler);
    app.delete('/api/user/:id',controller.deleteUserHandler);

}
export default routes;
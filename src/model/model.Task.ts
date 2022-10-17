import mongoose, { Document, Schema } from "mongoose";

export interface Task {
    todo: string;
    isDone: boolean;
}

export interface TaskModel extends Task, Document {
}

const TaskSchema: Schema = new Schema(
    {
        // _id: {type: String, required: true, unique: true},
        todo: {type: String, required: true},
        isDone: {type: Boolean}
    }, 
    // { 
    //     collection: 'Tasks',
    //     versionKey: false
    // }
)


export default mongoose.model<TaskModel>('ApolloTask', TaskSchema)
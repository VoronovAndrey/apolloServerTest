import Task from '../model/model.Task'


// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
export const resolvers = {
  Query: {
    tasks: async () => {
        return await Task.find()
    },
    task: async (parent: any, args: any) => {
        const { taskId } = args
        return await Task.findById(taskId)
    }
  },
  Mutation: {
    addTask: async (parent: any, { title }: any) => {
      const task = new Task({
        todo: title,
        isDone: false,
      });

      return await task.save()
    },
    removeTask: async (parent: any, {taskId}: any) => {
        const wasDeleted = (await Task.deleteOne({_id: taskId})).deletedCount
        return wasDeleted
      },
    updateTask: async (parent: any, args: any) => {
        const {taskId, taskInput: {isDone, todo}} = args
        const wasEdited = (await Task.updateOne({_id: taskId}, {
            todo: todo,
            isDone: isDone
        })).modifiedCount
        return wasEdited
    }
  },
  
};
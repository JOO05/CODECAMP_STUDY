import { DataSource } from "typeorm";
import { Board } from "./Board.postgres";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
const typeDefs = `#graphql
  input CreateBoardInput {
    writer: String
    title: String
    contents: String
  }
  type MyBoard {
    number: Int
    writer: String
    title: String
    contents: String
  }
  type Query {
    fetchBoards: [MyBoard]
  }
  type Mutation {
    # 연습용
    # createBoard(writer:String,title:String,contents:String): String
    # 실무용
    createBoard(createBoardInput:CreateBoardInput): String
  }
`;
const resolvers = {
  Query: {
    fetchBoards: async () => {
      const result = await Board.find()
      return result
    }
  }, 
  Mutation: {
    createBoard: async (parent:any, args:any, context:any, info:any) => {
      await Board.insert({
        ...args.createBoardInput
      }) 
      return "등록 성공"
    },
    updateBoard: async () => {
      await Board.update({},{})
    },
    deleteBoard: async () => {
      await Board.delete({})
      await Board.update({number: 3},{deletedAt: new Date()})
    }, 
  }
};

const server = new ApolloServer({
  typeDefs, resolvers,
  cors: true,
});
const AppDataSource = new DataSource({
  type: "postgres",
  host: "220.118.175.175",
  port: 5001,
  username: "postgres",
  password: "postgres2022",
  database: "postgres",
  entities: [Board],
  synchronize: true,
  logging: true
})
AppDataSource.initialize().then(()=>{
  console.log("DB 접속")
  startStandaloneServer(server).then(()=>{
    console.log("서버 키기")
  })
}).catch((error)=>{
  console.log(error)
})
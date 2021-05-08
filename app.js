const { GraphQLServer } = require("graphql-yoga");
const fetch = require("node-fetch");

const baseURL = `https://rest-demo-hyxkwbnhaz.now.sh`;

const resolvers = {
  Query: {
    bikes: (parent, args) => {
      return fetch(
        `https://api.helbiz.com/admin/reporting/arlington/gbfs/free_bike_status.json`
      )
        .then((res) => res.json())
        .then((res) => {
          return args.bike_id
            ? res.data.bikes.filter((item) =>
                String(item.bike_id)
                  .toLowerCase()
                  .includes(String(args.bike_id).toLowerCase())
              )
            : res.data.bikes;
        });
    },
  },
};

const server = new GraphQLServer({
  typeDefs: "./src/types/bike.graphql",
  resolvers,
});

server.start(() => console.log(`Serving on localhost:4000`));

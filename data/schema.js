const graphql = require('graphql');
const axios = require('axios');

const query = new graphql.GraphQLObjectType({
  name: "Query",
  description: "GraphQL and Zomato Server Config",
  fields: () => ({
     Restaurant: {
       type: RestaurantType,
       description: "Zomato Restaurant API data with enhanced and additional data",
       args:{
         lat: {type: new graphql.GraphQLNonNull(graphql.GraphQLFloat)},
         lon: {type: new graphql.GraphQLNonNull(graphql.GraphQLFloat)}
       },
      //  api_key: "8d3bd8079eda39982c73397ba599afde",
      //  http_method: "GET",
      //  method_type: "application/json",
       resolve: (_,{lat, lon}) => {
         console.log('test')
         const urlString = `https://developers.zomato.com/api/v2.1/search?&lat=${lat}&lon=${lon}`;
         return axios.get(urlString)
                    .then(function(response) {
                      return response.data;
                    });
     	 },
     },
  })
});

const LocationType = new graphql.GraphQLObjectType({
  name: "Location",
  description: "Location information",
  fields: () => ({
    address:{type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
    city: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
    latitude: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
    longitude: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
    zipcode: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
    country_id: {type: graphql.GraphQLInt}
  })
});

const UserRatingType = new graphql.GraphQLObjectType({
  name: "UserRating",
  description: "User rating information",
  fields: () => ({
    aggregate_rating:{type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
    rating_color: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)}
  })
});

const PhotoType = new graphql.GraphQLObjectType({
  name: "Photos",
  description: "Photos from Zomato",
  fields: () => ({
    id: {type: graphql.GraphQLInt},
    url: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
    friendly_time: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
    width: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
    height: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)}
  })
});


const RestaurantType = new graphql.GraphQLObjectType({
  name: "Restaurant",
  description: "Restaurant information",
  fields: () => ({
    id: {type: graphql.GraphQLInt},
    name: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
    location: {
      type: new graphql.GraphQLList(LocationType)
      //resolve: function(){
        //return location;
      //}
    },
    price_range: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
    featured_image:{type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
    user_rating:{
      type: UserRatingType
    },
    is_delivering_now: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
    cuisines: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
    phone_numbers: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
    photos:{
      type: new graphql.GraphQLList(PhotoType)
    }
  })
});

const RestaurantSearchType = new graphql.GraphQLObjectType({
  name: "RestaurantSearch",
  description: "Restaurant search information",
  fields: () => ({
    results_found: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
    restaurants:{
      id: {type: graphql.GraphQLInt},
      name: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
      location: {
        type: new graphql.GraphQLList(LocationType)
      },
      price_range: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
      user_rating:{
        type: UserRatingType
      },
      is_delivering_now: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
      cuisines: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
    },
    photos:{
      type: new graphql.GraphQLList(PhotoType)
    }
  })
});

module.exports = new graphql.GraphQLSchema({
	query:query
});

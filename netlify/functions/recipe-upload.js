// upload recipe from html form to contentful using serverless functions
const contentful = require('contentful-management')


const client = contentful.createClient({
  accessToken: process.env.CTFL_ACCESSTOKEN
})


client.getSpace(process.env.CTFL_SPACE)
.then((space) => space.getEnvironment('master'))
.then((environment) => environment.createAssetFromFiles({
  fields: {
    title: {
      'en-US': 'Asset title'
    },
    file: {
      'en-US': {
        contentType: 'image/svg+xml',
        fileName: 'circle.svg',
        file: '<svg><path fill="red" d="M50 50h150v50H50z"/></svg>'
      }
    }
  }
}))
.then((asset) => asset.processForAllLocales())
.then((asset) => asset.publish())
.catch(console.error)



client.getSpace(process.env.CTFL_SPACE)
.then((space) => space.getEnvironment('master'))
.then((environment) => environment.createEntry('recipe', {
  fields: {
    title: {
        "en-US": "Salsice, broccolini and chilli orecchiette"
    },
    level: {
        'en-US': 'Entry title'
    },
    thumbnail: {
        "en-US": {
          "sys": {
            "type": "Link",
            "linkType": "Asset",
            "id": "1z6yMsf4tlqocaIoL2WxQV"
          }
        }
    },
    shortDescription: {
        "en-US": "A variable italian orecchiette "
    },
    categories: {
        "en-US": [
          "Gluten Free",
          "Dairy Free",
          "Main",
          "Italian",
          "Pork",
          "Pasta"
        ]
    },
    servings: {
        "en-US": 4
    },
    prepTime: {
        "en-US": "5min"
    },
    cookTime: {
        "en-US": "20min"
    },
    ingredients: {
        "en-US": [
          "Italian pork sausages x 4",
          "Two bunches of broccolini",
          "Orecchiette pasta (handmade is best)",
          "Salt and pepper",
          "Chilli flakes ",
          "Garlic",
          "White wine "
        ]
    },
    instructions: {
        "en-US": [
          "Boil enough salted water for the pasta (not too much) and quickly cook the broccolini tops. Remove and set aside",
          "Add the pasta",
          "Brown garlic in a little olive oil",
          "Add the decased sausage",
          "Break up and brown",
          "Add white wine, chilli, salt and pepper",
          " Add the broccolini",
          "The pasta should be almost cooked with little water left in the pot.",
          "Add the meat and broccolini to the pasta, boil again and add some fresh olive oil to serve",
          "Add chilli flakes as required"
        ]
    },
    chefsComments: {
        "en-US": "Full 500g pack of pasta ≈ 4 people "
    }
  }
}))
.then((entry) => console.log(entry))
.catch(console.error)



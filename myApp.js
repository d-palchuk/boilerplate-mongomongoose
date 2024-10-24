const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// SCHEMA
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  favoriteFoods: {
    type: [String],
  },
});

// MODELS
const PersonModel = mongoose.model("Person", personSchema);

// METHODS
const createAndSavePerson = (done) => {
  const personRecord = new PersonModel({
    name: "Zhopa Person",
    age: 88,
    favoriteFoods: ["eggs", "milk", "meat", "onion"],
  });

  personRecord.save((err, data) => {
    if (err) {
      return console.error(err);
    }

    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  PersonModel.create(arrayOfPeople, (err, data) => {
    if (err) {
      return console.error(err);
    }

    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  PersonModel.find({ name: personName }, (err, data) => {
    if (err) {
      return console.error(err);
    }

    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  PersonModel.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {
      return console.error(err);
    }

    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  PersonModel.findById({ _id: personId }, (err, data) => {
    if (err) {
      return console.error(err);
    }

    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  findPersonById(personId, (err, data) => {
    if (err) {
      return console.error(err);
    }

    const personRecord = data;

    personRecord.favoriteFoods.push(foodToAdd);

    personRecord.save((err, data) => {
      if (err) {
        return console.error(err);
      }

      done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  PersonModel.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, data) => {
      if (err) {
        return console.error(err);
      }

      done(null, data);
    }
  );
};

const removeById = (personId, done) => {
  PersonModel.findByIdAndRemove(personId, (err, data) => {
    if (err) {
      return console.error(err);
    }

    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  PersonModel.remove({ name: nameToRemove }, (err, data) => {
    if (err) {
      return console.error(err);
    }

    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  PersonModel.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) {
        return console.error(err);
      }

      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = PersonModel;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

const LanguagesData = require("./assets/languagesData");
const handleVoicesGender = require("./assets/handleVoicesGender");

function handleVoices(data) {
  // Create array of languages
  let _langs = data.map((ele) => {
    return ele.language;
  });

  // filter languages
  let _filteredLangs = _langs.filter((item, pos) => {
    return _langs.indexOf(item) == pos;
  });

  // To get the original languages's names
  // so we can arrage languages by their names
  const _langsNames = _filteredLangs
    .map((ele) => {
      const isInIt = LanguagesData.find((e) => e.value == ele);
      if (isInIt) {
        return isInIt.label;
      } else {
        return ele;
      }
    })
    .sort();

  // Replace all language with the new ones
  let nwArr = _langsNames.map((ele) => {
    const isInIt = LanguagesData.find((e) => e.label == ele);
    if (isInIt) {
      return isInIt;
    } else {
      return {
        key: "lang_" + ele,
        label: ele,
        value: ele,
        type: "lang",
        voices: [],
      };
    }
  });

  // Add voice gender
  const arrOfVoices = handleVoicesGender(data);

  // Distrbuite all voices
  const pushVoices = nwArr.map((ele) => {
    const voicesOfThisLanguage = arrOfVoices.filter(
      (e) => e.language == ele.value
    );
    return {
      ...ele,
      voices: voicesOfThisLanguage.map((voice) => {
        return {
          key: voice.identifier,
          label:
            "Voice_0" +
            (voicesOfThisLanguage.indexOf(voice) + 1) +
            " (" +
            voice.gender +
            ")",
          value: voice.name,
          gender: voice.gender,
          type: "voice",
        };
      }),
    };
  });

  // return data
  return pushVoices;
}

module.exports = handleVoices;

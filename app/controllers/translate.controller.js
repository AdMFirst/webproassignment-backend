const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const {IamAuthenticator} = require('ibm-watson/auth');

const languageTranslator = new LanguageTranslatorV3({
    version: process.env.TRANSLATOR_VERSION,
    authenticator: new IamAuthenticator({
        apikey: process.env.TRANSLATOR_API_KEY,
    }),
    serviceUrl: process.env.TRANSLATOR_URL,
    disableSslVerification: true,
});

exports.translate = async (req, res) => {
    if (!req.body.text) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    try {
        const translateParams = {
            modelId: 'uk-en',
            text: req.body.text,
        };

        languageTranslator.translate(translateParams)
            .then(data => {
                res.status(200).send(data.result.translations.map(t => t.translation));
            })
            .catch(err => {
                console.log('error:', err);
                res.status(500).send({
                    message: err
                });
            });
    } catch (e) {
        res.status(500).send({
            message: e
        });
    }
};

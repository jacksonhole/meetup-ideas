import config from '../config/environment';
import Firebase from 'firebase';
import FirebaseAdapter from 'emberfire/adapters/firebase';

let adapter = DS.RESTAdapter.extend({});

if (config.environment == 'production') {
  adapter = FirebaseAdapter.extend({
    firebase: new Firebase(config.firebase)
  });
}

export default adapter;

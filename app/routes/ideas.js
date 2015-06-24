import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return this.store.find('idea');
  },

  actions: {
    createIdea: function(newIdea) {
      let idea = this.store.createRecord('idea', {
        description: newIdea
      });

      idea.save();
      this.controllerFor('ideas').set('newIdea', '');
    },

    deleteIdea: function(idea) {
      if (confirm('Are you sure?')) {
        idea.destroyRecord();
      }
    }
  }
});

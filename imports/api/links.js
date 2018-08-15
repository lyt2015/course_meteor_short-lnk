import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import shortid from 'shortid'

export const Links = new Mongo.Collection('links')

if (Meteor.isServer) {
  Meteor.publish('pubLinks', function() {
    const userId = this.userId
    if (userId) {
      return Links.find({ userId })
    }

    // return Links.find({ url: { $regex: 'www' } })
  })
}

Meteor.methods({
  'links.insert'(url) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    new SimpleSchema({
      url: {
        type: String,
        label: 'Your link',
        regEx: SimpleSchema.RegEx.Url,
      },
    }).validate({ url })

    Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null,
    })
  },
  'links.setVisibility'(_id, visible) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 7,
      },
      visible: {
        type: Boolean,
      },
    }).validate({ _id, visible })

    Links.update({ userId: this.userId, _id }, { $set: { visible } })
  },
  'links.trackVisit'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 7,
      },
    }).validate({ _id })

    Links.update(
      { _id },
      {
        $inc: { visitedCount: +1 },
        $set: { lastVisitedAt: new Date().getTime() },
      }
    )
    // Links.update({ _id }, { $set: { lastVisitedAt: new Date().getTime() } })
  },
})

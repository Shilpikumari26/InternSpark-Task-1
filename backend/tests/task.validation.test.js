const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const Task = require('../src/models/Task');

test('requires a non-empty title for task creation', async () => {
  const task = new Task({
    user: new mongoose.Types.ObjectId(),
    time: '09:00',
    priority: 'High'
  });

  await assert.rejects(
    task.validate(),
    (error) => {
      assert.match(error.message, /title/i);
      return true;
    }
  );
});

test('accepts a valid task payload', async () => {
  const task = new Task({
    user: new mongoose.Types.ObjectId(),
    title: 'Write API docs',
    time: '09:00',
    priority: 'High'
  });

  await assert.doesNotReject(() => task.validate());
});

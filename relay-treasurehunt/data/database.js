/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

// // Model types
// class User {}
// class Widget {}
//
// // Mock data
// var viewer = new User();
// viewer.id = '1';
// viewer.name = 'Anonymous';
// var widgets = ['What\'s-it', 'Who\'s-it', 'How\'s-it'].map((name, i) => {
//   var widget = new Widget();
//   widget.name = name;
//   widget.id = `${i}`;
//   return widget;
// });
//
// module.exports = {
//   // Export methods that your schema can use to interact with your database
//   getUser: (id) => id === viewer.id ? viewer : null,
//   getViewer: () => viewer,
//   getWidget: (id) => widgets.find(w => w.id === id),
//   getWidgets: () => widgets,
//   User,
//   Widget,
// };

export class Game {};
export class HidingSpot {};

var game = new Game();
game.id = '1';

var hidingSpots = [];

(function () {
	var treasureSpot = Math.floor(Math.random() * 9);
	for(var i = 0; i < 9; i++) {
		var hidingSpot = new HidingSpot();
		hidingSpot.id = `{id}`;
		hidingSpot.hasTreasure = (i === treasureSpot);
		hidingSpot.hasBeenChecked = false;
		hidingSpots.push(hidingSpot);
	}
})();

var turnsRemaining = 3;

export function checkSpotForTreasure(id){
    if(hidingSpots.some(hs => hs.hasTreasure && hs.hasBeenChecked)){
        return;
    }
    turnsRemaining--;
    var hidingSpot = getHidingSpot(id);
    hidingSpot.hasBeenChecked = true;
    return hidingSpot.hasTreasure;
}

export function getHidingSpot(id){
    return hidingSpots.find(hs => hs.id === id);
}

export function getTurnsRemaining(){
    return turnsRemaining;
}

export function getGame(){
    return game;
}

export function getHidingSpots(){
    return hidingSpots;
}

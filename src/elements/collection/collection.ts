import { DeckModel } from 'models/deck-model';

import { LocalStorageService } from './../../services/local-storage-service';
import { CurrentDeckService } from './../../services/current-deck-service';
import { inject } from 'aurelia-framework';

@inject(LocalStorageService, CurrentDeckService)
export class CollectionCustomElement {
  decks: Array<DeckModel>;

  constructor(private storage: LocalStorageService, private currentDeck: CurrentDeckService) {
    this.decks = new Array<DeckModel>();
    this.storage.getKeys().forEach(key => {
      const deck = this.storage.retrieve(key);
      this.decks.push(deck);
    });
  }

  new() {
    this.currentDeck.deck = new DeckModel();
  }

  load(deck: DeckModel) {
    // Copy the deck
    // Attention! This copy technique might not work with dates (which we are not using... for the moment)
    const workingCopy = JSON.parse(JSON.stringify(deck));

    // Use it
    this.currentDeck.deck = workingCopy;
  }
}

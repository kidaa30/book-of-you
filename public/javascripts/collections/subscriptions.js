var subscriptions;

subscriptions = {
	book: {
		crud: {
			any: '#.crud.#',
			delete: {
				done: 'book.crud.delete.done'
			},
			create: {
				done: 'book.crud.create.done'
			}
		},
		name: {
			set: 'book.name.set',
			setError: 'book.name.set.error'
		},
		chapters: {
			crud: {
				create: {
					done: 'chapters.crud.create.done',

				}
			},
			chapter: {
				crud: {},
				set: 'book.chapters.chapter.set',
				setError: 'book.chapters.chapter.set.error',
				verses: {
					crud: {
						create: {
							error: 'book.chapters.chapter.verse.crud.create.error',
							done:'book.chapters.chapter.verse.crud.create.done'
						}
					},
					verse: {
						crud: {
							any: {
								done: 'book.chapters.chapter.verses.verse.crud.*.done'
							},
							create: {
								error: 'book.chapters.chapter.verses.verse.crud.create.error',
								errorNoVerse: 'book.chapters.chapter.verses.verse.crud.create.error.noVerse',
								done:'book.chapters.chapter.verse.crud.create.done'
							}
						}
					}
				}
			}
		}
	}
};

module.exports = subscriptions;
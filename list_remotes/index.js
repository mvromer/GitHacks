var Git = require( 'nodegit' );

const url = 'https://github.com/mvromer/ConvexABF.git';

Git.Remote.createDetached( url ).then( function( remote ) {
    remote.connect( Git.Enums.DIRECTION.FETCH ).then( function( number ) {
        remote.referenceList().then( function( remoteHeads ) {
            // Match only those refs under refs/tags that don't have the ^{} operator applied. These
            // refs are basically dereferenced tag objects, but we don't care about them from the
            // perspective of simply getting the list of remote tag names.
            const tagRefPattern = /^refs\/tags\/([^^]+)$/;

            let tags = [];
            for ( remoteHead of remoteHeads ) {
                tagMatch = remoteHead.name().match( tagRefPattern );
                if ( tagMatch ) {
                    // First capture group contains the tag name.
                    tags.push( tagMatch[1] );
                }
            }

            for ( var tag of tags ) {
                console.log( tag );
            }
        });
    });
});

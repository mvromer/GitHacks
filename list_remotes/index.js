var Git = require( 'nodegit' );

var url = 'https://github.com/libgit2/libgit2.git';
//var url = 'https://github.com/mvromer/crispybits.io';

Git.Remote.createDetached( url ).then( function( remote ) {
    remote.connect( Git.Enums.DIRECTION.FETCH ).then( function( number ) {
        remote.referenceList().then( function( remoteHeads ) {
            var tags = remoteHeads
                .map( rh => rh.name() )
                .filter( refspec => refspec.startsWith( 'refs/tags/' ) );

            for( var tag of tags ) {
                console.log( tag );
            }
        } );
    } );
} );

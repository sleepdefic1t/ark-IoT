var nfc = require('./nfc');

function wasPushed() {
    console.log('\n **** button.wasPushed ****');
    console.log('   requesting NDEF Data... \n');    
    nfc.dataWasRequested();  
}

module.exports = {
    wasPushed: wasPushed
};

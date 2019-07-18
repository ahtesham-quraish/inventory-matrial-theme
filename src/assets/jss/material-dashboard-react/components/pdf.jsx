const styles = {
  //.quotation-block
  quotationBlockClass: {
    overflow: 'hidden',
    maxWidth: '1170px',
    margin: '0 auto',
    padding: '20px 15px',
  },
  //.quotation-block .header-section
  quotationBlockHeaderSectionClass: {
    overflow: 'hidden',
    borderBottom: '1px solid #000',
    padding: '0 0 10px',
    position: 'relative',
  },
  //.header-section .left-col
  headerSectionLeftColClass: {
    float: 'left',
    width: '50%',
    margin: '40px 0 0',
  },
  //.header-section .left-col h1
  headerSectionLeftColh1Class: {
    fontSize: '30px',
    lineHeight: '35px',
    fontWeight: 'bold',
    margin: '0 0 10px',
  },
  //.header-section .left-col dl dt
  headerSectionLeftColdldtClass: {
    float: 'left',
    margin: '0 5px 0 0',
    fontWeight: 'bold',
  },
  //.header-section .left-col dl dd
  headerSectionLeftColdlddClass: {
    margin: '0 0 5px',
  },
  //.header-section .right-col
  headerSectionRightColClass: {
    float: 'right',
    width: '220px',
    height: '220px',
    border: '1px solid #000',
    position: 'relative',
    padding: '10px',
  },
  //.header-section .right-col img
  headerSectionRightColimgClass: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  //.quotation-block .header-section .title
  quotationBlockHeaderSectionTitleClass: {
    display: 'block',
    textTransform: 'capitalize',
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    left: '0',
    right: '0',
    bottom: '10px',
    fontSize: '30px',
    lineHeight: '35px',
    fontWeight: 'bold',
  },
  //.info-block
  infoBlockClass: {
    overflow: 'hidden',
    padding: '0 0 30px',
  },
  //.info-block .bio-block
  infoBlockBioBlockClass: {
    padding: '20px 0',
    overflow: 'hidden',
    margin: '0 0 0 -3%',
  },
  //.bio-block .field
  bioBlockFieldClass: {
    float: 'left',
    width: '47%',
    margin: '0 0 15px 3%',
  },
  //.bio-block .field.large
  bioBlockFieldLargeClass: {
    float: 'none',
    width: '100%',
    overflow: 'hidden',
  },
  //.bio-block .field label
  bioBlockFieldlabelClass: {
    // float: 'left',
    // width: '180px',
  },
  //.bio-block .field input, .bio-block .field input:disabled
  bioBlockFieldinputClass: {
    background: '#eeeeef',
    borderWidth: '0 0 1px',
    borderStyle: 'solid',
    borderColor: 'transparent transparent #000',
    padding: '0',
    width: '67%',
    outline: 'none',
    float: 'right',
  },
  bioBlockFieldinputDisabledClass: {
    background: '#eeeeef',
    borderWidth: '0 0 1px',
    borderStyle: 'solid',
    borderColor: 'transparent transparent #000',
    padding: '0',
    width: '67%',
    outline: 'none',
    float: 'right',
  },
  //.bio-block .field.large input, .bio-block .field.large input:disabled
  bioBlockFieldLargeinputClass: {
    width: '84.5%',
  },
  bioBlockFieldLargeinputDisabledClass: {
    width: '84.5%',
  },
  //table, caption, tbody, tfoot, thead, tr, th, td
  tableElement: {
    borderCollapse: 'collapse',
    borderSpacing: '0',
    width: '100%',
  },
  captionElement: {
    borderCollapse: 'collapse',
    borderSpacing: '0',
    width: '100%',
  },
  tbodyElement: {
    borderCollapse: 'collapse',
    borderSpacing: '0',
    width: '100%',
  },
  tfootElement: {
    borderCollapse: 'collapse',
    borderSpacing: '0',
    width: '100%',
  },
  theadElement: {
    borderCollapse: 'collapse',
    borderSpacing: '0',
    width: '100%',
  },
  trElement: {
    borderCollapse: 'collapse',
    borderSpacing: '0',
    width: '100%',
  },
  thElement: {
    borderCollapse: 'collapse',
    borderSpacing: '0',
    width: '100%',
  },
  tdElement: {
    borderCollapse: 'collapse',
    borderSpacing: '0',
    width: '100%',
  },

  //.info-block th, .info-block td
  infoBlockthClass: {
    border: '1px solid #000',
    padding: '15px 7px',
    textAlign: 'center',
    verticalAlign: 'middle',
    width: 'auto',
  },
  infoBlocktdClass: {
    border: '1px solid #000',
    padding: '15px 7px',
    textAlign: 'center',
    verticalAlign: 'middle',
    width: 'auto',
  },

  //.info-block tr.last td
  infoBlocktrLasttdClass: {
    fontSize: '20px',
    lineHeight: '25px',
    border: '0',
    padding: '20px 10px 0',
    textAlign: 'left',
  },
  //.info-block tr.last.grand td
  infoBlocktrLastGrandtdClass: {
    fontSize: '25px',
    lineHeight: '30px',
    fontWeight: 'bold',
    border: '0',
    padding: '20px 10px 0',
  },
  //.info-block tr.last td span
  infoBlocktrLasttdspanClass: {
    display: 'block',
    width: '150px',
  },
  //.signature-block
  signatureBlockClass: {
    overflow: 'hidden',
    margin: '-25px 0 0',
  },
  //.signature-block .name
  signatureBlockNameClass: {
    display: 'inline-block',
    verticalAlign: 'bottom',
    margin: '0 10px 0 0',
  },
  //.signature-block .signature
  signatureBlockSignatureClass: {
    display: 'inline-block',
    verticalAlign: 'bottom',
    borderBottom: '1px solid #000',
    width: '300px',
  },
  divider: {
    width: '100%',
    display: 'inline-block',
    borderBottom: '1px solid #000',
    verticalAlign: 'bottom',
    marginBottom: '16px',
  },
};
export default styles;

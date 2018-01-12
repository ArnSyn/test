
import shared from '../../server/config/environment/shared.js';
shared.mockXML = {
    'root': {
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      // tslint:disable-next-line:max-line-length
      'report': `
      Costco's (NASDAQ:COST) low-price, membership-based operating model has helped it avoid the worst of those problems so far. But its latest operating results show that the business isn't immune from the broader industry slowdown.
      Here's a look at the key trends that dominated the fiscal year that the warehouse giant just closed.
      1. Sales growth
      
      CHART BY AUTHOR. DATA SOURCE: COSTCO FILINGS.
`,
      'annotations': {
        'named-entities': {
          'NE': [
            {
              'id': 'N0',
              'conceptID': '145: Company Name',
              'start': '0',
              'end': '6',
              'text': 'Costco',
              'type': 'corporation'
            },
            {
              'id': 'N1',
              'start': '10',
              'end': '16',
              'text': 'NASDAQ',
              'type': 'exchange'
            },
            {
              'id': 'N2',
              'start': '12',
              'end': '16',
              'text': 'SDAQ',
              'type': 'EquityMetric'
            }
          ]
        },
        'tags': {
          'tag': [
            {
              'id': 'I0',
              'start': '1644',
              'end': '1699',
              'negation': 'false',
              'text': 'So we have changed the recommendation from HOLD to BUY',
              'type': 'Bullish'
            },
            {
              'id': 'I1',
              'start': '508',
              'end': '516',
              'text': 'Wal-Mart',
              'comment': 'mark with competitor tag',
              'type': 'to-do'
            },
            {
              'id': 'I2',
              'start': '688',
              'end': '743',
              'negation': 'true',
              'text': 'Based on this research we recommend not to buy Walmart.',
              'type': 'Bullish'
            },
            {
              'id': 'I3',
              'start': '23',
              'end': '32',
              'text': 'low-price',
              'type': 'to-do'
            }
          ]
        },
        'relations': {
          'L-LINK': [
            {
              'id': 'L0',
              'fromID': 'N0',
              'toID': 'N4',
              'directional': 'false',
              'relationship': 'competition'
            },
            {
              'id': 'L1',
              'fromID': 'N0',
              'toID': 'N1',
              'directional': 'true',
              'relationship': 'listed-in'
            },
            {
              'id': 'L2',
              'fromID': 'N7',
              'toID': 'N8',
              'directional': 'true',
              'relationship': 'hasupdate'
            }
          ]
        }
      }
    }
  };

  shared.selectTags = [];
  shared.selectTags.push({ type: 'corporation', annotation: 'named-entities', comment: false, color: '#78B14B' });
  shared.selectTags.push({ type: 'exchange', annotation: 'named-entities', comment: false, color: '#A7E2DB' });
  shared.selectTags.push({ type: 'EquityMetric', annotation: 'named-entities', comment: false, color: '	#E2F0F7' });
  shared.selectTags.push({ type: 'Upgrade', annotation: 'named-entities', comment: false, color: '#F5C8E2' });
  shared.selectTags.push({ type: 'pricetarget', annotation: 'named-entities', comment: false, color: '#FF5733' });
  shared.selectTags.push({ type: 'to-do', annotation: 'tags', comment: true, color: '#C6C6C6' });
export default shared;

import ShrimpMedicinePage, { metadata as baseMetadata } from '../shrimp-medicine/page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...baseMetadata,
  title: 'Next Farm Bio Sciences | Shrimp Aquaculture Products in Andhra Pradesh',
  description:
    'Explore Next Farm Bio Sciences aquaculture bio-inputs for shrimp farming, including probiotics, pond water conditioners and mineral supplements. Based in Vijayawada, Andhra Pradesh. Direct field dispatch to Eluru, Kaikaluru, Bapatla, Cherukupalli, Visakhapatnam, and Bhimavaram.',
  alternates: {
    canonical: 'https://nextfarmbiosciences.app/shrimp-aquaculture-products-andhra-pradesh'
  }
};

export default ShrimpMedicinePage;

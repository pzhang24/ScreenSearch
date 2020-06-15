import React from 'react';
import InfoGalleryCard from './InfoGalleryCard';

/*
    Props:
        itemList: array with a list of objects to display 
            Objects contain values for the following names:
                id, type, img_path, name, subtext
        title: title of the InfoGallery

*/
class InfoGallery extends React.Component {

    #NUM_ITEMS_TO_RENDER = 8;

    constructor(props) {
        super(props);

        this.state = {
            currentIndex: 0,
            toRender: []
        }
    }

    processItemsToRender = (startIndex) => {
        return this.props.itemList.slice(startIndex, startIndex + this.#NUM_ITEMS_TO_RENDER);
    }

    nextItems = () => {
        const newIndex = this.state.currentIndex + 1;
        this.setState({currentIndex: newIndex});
    }

    prevItems = () => {
        const newIndex = this.state.currentIndex - 1;
        this.setState({currentIndex: newIndex});
    }

    //Need to check current index before rendering prev and next buttons!
    render() {
        var galleryList = this.processItemsToRender(this.state.currentIndex);
        
        return (
            <div className="gallery">
                <h2 className="gallery_title">{this.props.title}</h2>
                <div className="gallery_container">
                    {/*Display previous button if necessary*/}
                    {this.state.currentIndex > 0 &&
                        <button className="gallery_prev" onClick={this.prevItems}>
                            <i className="fas fa-angle-left fa-3x"></i>
                        </button>}

                    <div className="gallery_track">
                    {galleryList.map((item, index) => {
                        return <InfoGalleryCard viewInfo={this.props.viewInfo} cardInfo={item} key={index}></InfoGalleryCard>})}
                    </div>
                
                    {/*Display next button if necessary*/}
                    {this.state.currentIndex < (this.props.itemList.length - 1) &&
                        <button className="gallery_next" onClick={this.nextItems}>
                            <i className="fas fa-angle-right fa-3x"></i>
                        </button>}
                </div>
            </div>
        )
    }
}

export default InfoGallery;
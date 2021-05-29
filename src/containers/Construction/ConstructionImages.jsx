import React from "react";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBContainer,
} from "mdbreact";
import { GetImageConstruction } from "../../constants/api.url";

const ConstructionImages = ({ constructionField }) => {
  return (
    <div>
      {constructionField.images[0] && (
        <MDBContainer>
          <MDBCarousel
            activeItem={1}
            length={constructionField.images?.length}
            showControls={true}
            showIndicators={true}
            className="z-depth-1"
          >
            <MDBCarouselInner>
              {constructionField.images.map((element, index) => (
                <MDBCarouselItem itemId={index + 1} key={element.id}>
                  <MDBView>
                    <img
                      className="d-block w-100"
                      src={GetImageConstruction + `${element.name}`}
                      alt="First slide"
                    />
                  </MDBView>
                </MDBCarouselItem>
              ))}
            </MDBCarouselInner>
          </MDBCarousel>
        </MDBContainer>
      )}
    </div>
  );
};

export default ConstructionImages;

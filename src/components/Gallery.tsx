import React, { ComponentProps, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import API from "../libs/api";

interface GalleryProps {
  images?: string[];
  width?: number | string;
  height?: number | string;
  grid?: [number, number];
}

export interface PictureContainerProps {
  width?: number | string;
  height?: number | string;
  image?: string;
}

export const Gallery: React.FC<GalleryProps & ComponentProps<any>> = (
  props
) => {
  const { width, height } = props;
  const [characters, loadCharacters] = useState<any>();
  const [isLoading, toggleLoding] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [numOfPicturesToShow, setNumOfPicturesToShow] = useState<number | string>(4);
  const [images, setImagesToShow] = useState<string[]>([]);
  const ram = new API({ url: "https://rickandmortyapi.com/api" });

  React.useEffect(() => {
    toggleLoding(true);
    ram.call<any>(`/character/?name=${searchQuery}`).then((payload: any) => {
      toggleLoding(false);
      loadCharacters(payload.results);
    });
  }, [searchQuery]);

  React.useEffect(() => {
    //Shownumber of picture on screen
    if(characters){
      setImagesToShow(characters.slice(0, numOfPicturesToShow))
    }
    
  }, [numOfPicturesToShow, characters]);

  return (
    <Container style={{ width, height }} {...props}>
      <Row>
        <input
          type="range"
          min="0"
          max={characters ? characters.length : 0}
          defaultValue={ numOfPicturesToShow.toString() }
          step="1"
          onChange={(evt) => setNumOfPicturesToShow(evt.target.value)}
        />
      </Row>
      <Row>
        Search
        <input
          type="text"
          onChange={(evt) => setSearchQuery(evt.target.value)}
          placeholder="Search For Image..."
          defaultValue={searchQuery}
        />
      </Row>
      <Row>
        {isLoading
          ? "Loading"
          : characters
          ? images.map((character: any, index: number) => (
              <>
                <img
                  className={`picture-tile`}
                  src={character.image}
                  alt="/"
                  key={Math.random()}
                  style={{ width: "100px", height: "100px"}}
                />
              </>
            ))
          : null}
      </Row>
    </Container>
  );
};

// export const Picker: React.FC<ComponentProps<any>> = (props) => {
//   // var { images } = props;
//   const { width, height } = props;
//   var [characters, loadCharacters] = useState<any>();
//   var [page, setPage] = useState<number>(0);
//   var [isLoading, toggleLoding] = useState<boolean>(false);
//   const [selectedPicture, setSelectedPicture] = useState<string>("");

//   var ram = new API({ url: "https://rickandmortyapi.com/api" });

//   var [searchQuery, setSearchQuery] = useState<string>("");

//   React.useEffect(() => {
//     toggleLoding(true);
//     ram.call<any>(`/character/?name=${searchQuery}`).then((payload: any) => {
//       toggleLoding(false);
//       loadCharacters(payload.results);
//     });
//   }, [searchQuery]);

//   React.useEffect(() => {
//     toggleLoding(true);
//     ram.call<any>(`/character/?page=${page}`).then((payload: any) => {
//       console.log(payload.results);
//       toggleLoding(false);
//       loadCharacters(payload.results);
//     });

//     console.log("chagin");
//   }, [page]);

//   return (
//     <Container style={{ width, height }} {...props}>
//       <Row>
//         <Container>
//           <Row>
//             Search
//             <input
//               type="text"
//               onChange={(evt) => setSearchQuery(evt.target.value)}
//               placeholder="Search For Image..."
//               defaultValue={searchQuery}
//             />
//           </Row>
//           <Row>
//             <Col>
//               <Button
//                 onClick={() => {
//                   setPage(--page);
//                 }}
//               >
//                 -
//               </Button>
//             </Col>
//             <Col>
//               <Button
//                 onClick={() => {
//                   setPage(++page);
//                 }}
//               >
//                 +
//               </Button>
//             </Col>
//           </Row>

//           <Row>
//             {isLoading
//               ? "Loading"
//               : characters
//               ? characters.map((character: any, index: number) => (
//                   <>
//                     <img
//                       className={`picture-tile ${selectedPicture}`}
//                       src={character.image}
//                       alt="/"
//                       key={Math.random()}
//                       onClick={() => {
//                         setSelectedPicture(character.image);
//                       }}
//                     />
//                   </>
//                 ))
//               : null}
//             {}
//           </Row>
//         </Container>
//         <Button
//           onClick={() => {
//             props.loadPicture(selectedPicture);
//           }}
//         >
//           Load
//         </Button>
//       </Row>
//     </Container>
//   );
// };


// export const PictureContainer: React.FC<GalleryProps & ComponentProps<any>> = (
//   props
// ) => {
//   const [highlight, showHighlight] = useState<string>("hide");

//   return (
//     <div
//       className={`picture ${highlight}`}
//       onMouseEnter={() => {
//         showHighlight("");
//       }}
//     >
//       <div className={`picture-DELTE ${highlight}`}>Delete</div>
//       <div className={`picture-UPDATE ${highlight}`}>Update</div>
//       <div className={`picture-MOVELEFT ${highlight}`}>+</div>
//       <div className={`picture-MOVERIGHT ${highlight}`}>+</div>
//       {props.children}
//     </div>
//   );
// };
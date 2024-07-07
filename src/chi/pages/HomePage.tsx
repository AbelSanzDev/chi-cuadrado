import { Button, Tooltip } from "@nextui-org/react";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

const HomePage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div className=" h-lvh grid place-items-center">
        <div className="flex gap-5">
          <Link to={"/read-excel"}>
            <Tooltip size="lg" content="Subir Excel">
              <Button className="w-[30rem] h-[30rem] p-0">
                <img
                  className="w-full h-full object-cover"
                  src="https://res.cloudinary.com/dd46sqtrr/image/upload/v1720314628/imagenesChi/mh6djwnuez0dnabby3va.jpg"
                  alt=""
                />
              </Button>
            </Tooltip>
          </Link>
          <Link to={"/data-manually"}>
            <Tooltip size="lg" content={"Poner datos de forma Manual"}>
              <Button className="w-[30rem] h-[30rem] p-0">
                <img
                  src="https://res.cloudinary.com/dd46sqtrr/image/upload/v1720314633/imagenesChi/euiswjumcsc8pulupxlv.jpg"
                  alt=""
                />
              </Button>
            </Tooltip>
          </Link>
        </div>
        <div className="fixed bottom-5 right-5">
          <Link
            to={"https://github.com/AbelSanzDev/chi-cuadrado"}
            target="_blank"
          >
            <Tooltip content="Repositorio del proyecto">
              <Button size="lg" radius="full" isIconOnly aria-label="Like">
                <svg
                  viewBox="0 0 20 20"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <title>github [#142]</title>{" "}
                    <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                    <g
                      id="Page-1"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      {" "}
                      <g
                        id="Dribbble-Light-Preview"
                        transform="translate(-140.000000, -7559.000000)"
                        fill="#000000"
                      >
                        <g
                          id="icons"
                          transform="translate(56.000000, 160.000000)"
                        >
                          <path
                            d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                            id="github-[#142]"
                          ></path>
                        </g>
                      </g>
                    </g>{" "}
                  </g>
                </svg>
              </Button>
            </Tooltip>
          </Link>
        </div>
        <Tooltip content="Integrantes">
          <Button
            onPress={onOpen}
            size="lg"
            radius="full"
            isIconOnly
            aria-label="Like"
            className="fixed top-5 left-5"
          >
            <svg
              version="1.1"
              id="_x32_"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <path d="M147.57,320.188c-0.078-0.797-0.328-1.531-0.328-2.328v-6.828c0-3.25,0.531-6.453,1.594-9.5 c0,0,17.016-22.781,25.063-49.547c-8.813-18.594-16.813-41.734-16.813-64.672c0-5.328,0.391-10.484,0.938-15.563 c-11.484-12.031-27-18.844-44.141-18.844c-35.391,0-64.109,28.875-64.109,73.75c0,35.906,29.219,74.875,29.219,74.875 c1.031,3.047,1.563,6.25,1.563,9.5v6.828c0,8.516-4.969,16.266-12.719,19.813l-46.391,18.953 C10.664,361.594,2.992,371.5,0.852,383.156l-0.797,10.203c-0.406,5.313,1.406,10.547,5.031,14.438 c3.609,3.922,8.688,6.125,14.016,6.125H94.93l3.109-39.953l0.203-1.078c3.797-20.953,17.641-38.766,36.984-47.672L147.57,320.188z"></path>{" "}
                  <path d="M511.148,383.156c-2.125-11.656-9.797-21.563-20.578-26.531l-46.422-18.953 c-7.75-3.547-12.688-11.297-12.688-19.813v-6.828c0-3.25,0.516-6.453,1.578-9.5c0,0,29.203-38.969,29.203-74.875 c0-44.875-28.703-73.75-64.156-73.75c-17.109,0-32.625,6.813-44.141,18.875c0.563,5.063,0.953,10.203,0.953,15.531 c0,22.922-7.984,46.063-16.781,64.656c8.031,26.766,25.078,49.563,25.078,49.563c1.031,3.047,1.578,6.25,1.578,9.5v6.828 c0,0.797-0.266,1.531-0.344,2.328l11.5,4.688c20.156,9.219,34,27.031,37.844,47.984l0.188,1.094l3.094,39.969h75.859 c5.328,0,10.406-2.203,14-6.125c3.625-3.891,5.438-9.125,5.031-14.438L511.148,383.156z"></path>{" "}
                  <path d="M367.867,344.609l-56.156-22.953c-9.375-4.313-15.359-13.688-15.359-23.969v-8.281 c0-3.906,0.625-7.797,1.922-11.5c0,0,35.313-47.125,35.313-90.594c0-54.313-34.734-89.234-77.594-89.234 c-42.844,0-77.594,34.922-77.594,89.234c0,43.469,35.344,90.594,35.344,90.594c1.266,3.703,1.922,7.594,1.922,11.5v8.281 c0,10.281-6.031,19.656-15.391,23.969l-56.156,22.953c-13.047,5.984-22.344,17.984-24.906,32.109l-2.891,37.203h139.672h139.672 l-2.859-37.203C390.211,362.594,380.914,350.594,367.867,344.609z"></path>{" "}
                </g>{" "}
              </g>
            </svg>
          </Button>
        </Tooltip>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 font-serif text-xl">
                  Integrantes
                </ModalHeader>
                <ModalBody className="text-xl font-thin pb-5">
                  <h1>
                    <strong>Lider de proyecto:</strong> Sánchez Urrea Abel
                  </h1>
                  <h1>Lizarraga Acosta Jose Yair</h1>
                  <h1>Mendoza Lizarraga Rodolfo</h1>
                  <h1>Noriega Fitch Fabio Manuel</h1>
                  <h1>Quintero Herrera Irving Zuriel</h1>
                  <h1>Rodriguez Cevallos Elena Del Carmen</h1>
                  <h1>Rodriguez Dennis Jaime</h1>
                  <h1>Tirado Rios Luis Mario</h1>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default HomePage;

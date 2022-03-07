import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useChainContext } from "../../contexts/chain";
import { useWindowDimension } from "../../contexts/window";
import Card from "../card";
import { routes } from "./routes";

export default function SideBar({ btnRef, isOpen, onOpen, onClose }) {
  const { width, height } = useWindowDimension();
  const chainContext = useChainContext();
  const sm = 1024;
  if (width >= sm) {
    return (
      <Box width={"320px"} style={{ height: "100vh" }} padding={4}>
        <Card style={{ alignItems: "center", height: "100%" }}>
          <Button width={"100%"} colorScheme={"blue"}>
            CLOUS EXPLORER
          </Button>

          <Stack mt={4} spacing={4}>
            <Divider />
            {routes.map((item, index) => {
              return (
                <>
                  <Link
                    style={{ padding: 5, textAlign: "center" }}
                    to={"/" + chainContext.chain + item.path}
                  >
                    {item.display}
                  </Link>
                </>
              );
            })}
          </Stack>
        </Card>
      </Box>
    );
  } else {
    return (
      <>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
          size={"xs"}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>
              <Input placeholder="Type here..." />
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  }
}

import React, { CSSProperties } from "react";
import { Flex, Link, Table } from "@radix-ui/themes";

const History = () => {
  return (
    <Flex
      direction="column"
      justify="center"
      gap="3"
      ml="9"
      mr="9"
      mb="9"
      mt="6"
      p="7"
      style={styles.container}
    >
      <Table.Root>
        <Table.Header style={styles.text}>
          <Table.Row>
            <Table.ColumnHeaderCell>Media</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Count / Average Count per frame</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body style={styles.text}>
          <Table.Row>
            <Table.RowHeaderCell><Link href="#">abcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.jpg</Link></Table.RowHeaderCell>
            <Table.Cell>image</Table.Cell>
            <Table.Cell>12</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell><Link href="#">def.webm</Link></Table.RowHeaderCell>
            <Table.Cell>video</Table.Cell>
            <Table.Cell>23</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Flex>
  );
};

const styles: {
  container: CSSProperties;
  text: CSSProperties;
} = {
  container: {
    border: "2px solid gray",
    borderRadius: "16px",
    boxShadow: "0 0 10px 0 #cccccc",
    backgroundColor: "#faf5ed",
  },
  text: {
    fontFamily: "Montserrat",
    fontSize: 18,
  },
};

export default History;

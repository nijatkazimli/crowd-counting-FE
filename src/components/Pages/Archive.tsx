import React, { CSSProperties, useEffect, useState } from "react";
import { Flex, Link, Table } from "@radix-ui/themes";
import { ArchiveRecord, fetchArchive } from "../../api";
import { getFileTypeFromExtension, truncateUrl } from "../../utils";

const Archive = () => {
  const [archive, setArchive] = useState<ArchiveRecord[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const archiveResponse = await fetchArchive();
        setArchive(archiveResponse);
      } catch (error) {
        setArchive([]);
      }
    })();
  }, []);

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
            <Table.ColumnHeaderCell>Original</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Annotated</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Model</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              Average count per frame
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body style={styles.text}>
          {archive.map((record) => (
            <Table.Row key={record.id}>
              <Table.RowHeaderCell>
                <Link href={record.original_url}>{truncateUrl(record.original_url)}</Link>
              </Table.RowHeaderCell>
              <Table.Cell>
                {record.annotated_url ? (
                  <Link href={record.annotated_url}>{truncateUrl(record.annotated_url)}</Link>
                ) : (
                  ""
                )}
              </Table.Cell>
              <Table.Cell>
                {getFileTypeFromExtension(record.original_url).toLocaleLowerCase()}
              </Table.Cell>
              <Table.Cell>{record.model_name ?? ""}</Table.Cell>
              <Table.Cell>{record.averageCountPerFrame ?? ""}</Table.Cell>
            </Table.Row>
          ))}
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

export default Archive;

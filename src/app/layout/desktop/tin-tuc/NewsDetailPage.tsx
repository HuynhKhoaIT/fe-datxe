import { Box, Grid, Group, Skeleton } from "@mantine/core";
import styles from "./index.module.scss";
import Typo from "@/app/components/elements/Typo";
import Container from "@/app/components/common/Container";
import Banner from "./_component/Banner";
import ServiceList from "./_component/serviceList/ServiceList";
export default function NewDetailPage({
  newsData,
  newsDataLoading,
  newsDataList,
}: any) {
  return (
    <div>
      <Banner data={newsData} loading={newsDataLoading} />
      <Container>
        <Grid gutter={8}>
          <Grid.Col span={9}>
            <Box w={"100%"}>
              {newsData ? (
                <div
                  dangerouslySetInnerHTML={{ __html: newsData?.description }}
                ></div>
              ) : (
                <Skeleton style={{ marginTop: 25 }} />
              )}
            </Box>
          </Grid.Col>
          <Grid.Col span={3}>
            <Group justify="center">
              <Box>
                <Box>
                  <Typo size="small" type="bold">
                    Một số tin tức đề xuất
                  </Typo>
                </Box>
                <Box mt="20px" mb="30px">
                  <ServiceList data={newsDataList} />
                </Box>
              </Box>
            </Group>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}

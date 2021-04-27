import { Block, Text, Spacer, Link, Inline, Flex, View } from 'vcc-ui';

const ProductDetails = ({ data }) => {
    const { id, bodyType, modelName, modelType, imageUrl } = data;
    return (
        <Block className="product-details-container">
            <Text subStyle="inline-link">{bodyType}</Text>
            <View direction="row">
                <Inline>
                    <Text subStyle="emphasis">{modelName}</Text>
                </Inline>
                <Spacer />
                <Inline>
                    <Text subStyle="inline-link">{modelType}</Text>
                </Inline>
            </View>
            <div style={{margin: "15px 0px"}}>
                <img src={imageUrl} width="100%" alt={modelName} />
            </div>
            <Flex extend={{ flexWrap: "wrap", justifyContent: "center", flexDirection: "row" }}>
                <Block>
                    <Link href={`/learn/${id}`} arrow="right" className="inline">
                        Learn
                    </Link>
                </Block>
                <Block extend={{ marginLeft: 24 }}>
                    <Link href={`/shop/${id}`} arrow="right" className="inline">
                        Shop
                    </Link>
                </Block>
            </Flex>
        </Block>
    )
}

export default ProductDetails

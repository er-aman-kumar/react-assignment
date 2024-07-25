
import PropTypes from "prop-types"

const propTypes = {
    images: PropTypes.array.isRequired,
}

const ComparisonTable = ({ images }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="row" colSpan={5}>
                        <span className="d-flex justify-content-center"> Comparison Table</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="col">Photo</th>
                    <th scope="col">Id</th>
                    <th scope="col">URL</th>
                    <th scope="col">Thumbnail Url</th>
                    <th scope="col">Title</th>
                </tr>
                {images.map(photo => (
                    <tr key={photo.id}>
                        <th scope="row"><img src={photo.url} alt={photo.title} className="img-thumbnail" width="50px" height="50px" /></th>
                        <td>{photo.id}</td>
                        <td>{photo.url}</td>
                        <td>{photo.thumbnailUrl}</td>
                        <td>{photo.title}</td>
                    </tr>)
                )}
            </tbody>
        </table>
    )
}

ComparisonTable.propTypes = propTypes

export default ComparisonTable
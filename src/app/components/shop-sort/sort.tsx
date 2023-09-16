export async function Sort() {
    return (
        <div className="shop-sort">
            <h5>Showing 1-10 of 50 Results</h5>
            <div className="shop-sort-box">
                <select className="select">
                    <option value="1">Sort By Default</option>
                    <option value="5">Sort By Featured</option>
                    <option value="2">Sort By Latest</option>
                    <option value="3">Sort By Low Price</option>
                    <option value="4">Sort By High Price</option>
                </select>
            </div>
        </div>
    );
}

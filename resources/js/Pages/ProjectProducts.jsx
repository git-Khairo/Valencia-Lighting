import { usePage } from '@inertiajs/react';

export default function ProjectProducts() {
    const { project, products } = usePage().props;

    return (
        <>
            <h1>Products for {project.name}</h1>

            <ul>
                {products.length > 0 ? (
                    products.map((product) => (
                        <li key={product.id}>
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                        </li>
                    ))
                ) : (
                    <p>No products found for this project.</p>
                )}
            </ul>
        </>
    );
}

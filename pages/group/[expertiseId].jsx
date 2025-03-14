import Footer from '@/components/Footer';
import Groups from '@/components/groups/Groups';
import Header from '@/components/Header';
import http from '@/services/httpService';
import queryString from 'query-string';

export default function Group({ groupData, expertiseId }) {

    return (
        <div>
            <Header />
            <Groups groupData={groupData} expertiseId={expertiseId} />
            <Footer />
        </div>
    );
};


export async function getServerSideProps(ctx) {
    const { query, req } = ctx;

    try {
        const { expertiseId, ...filters } = query;

        const queryStr = queryString.stringify(filters);

        const { data } = await http.get(
            `/api/v1/users/experts/${expertiseId}?${queryStr}`
        );

        if (!data) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                groupData: data,
                expertiseId,
            },
        };

    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            notFound: true,
        };
    }
}

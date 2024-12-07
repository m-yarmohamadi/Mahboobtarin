import Footer from '@/components/Footer';
import Groups from '@/components/groups/Groups';
import Header from '@/components/Header';
import http from '@/services/httpService';

export default function Group({ users, expertiseId }) {    
    return (
        <div>
            <Header />
            <Groups users={users} expertiseId={expertiseId}/>
            <Footer />
        </div>
    );
};


export async function getServerSideProps(ctx) {
    const { query, req } = ctx;

    try {
        // const userToken = req.cookies.accessToken;

        // let user;

        // if (userToken) {
        //     const { data: userData } = await http.get(`/api/v1/user`, {
        //         headers: {
        //             Authorization: `Bearer ${userToken}`,
        //         },
        //     });

        //     user = userData.user;
        // }

        const { data } = await http.get(
            `/api/v1/users/experts/${query.expertiseId}`
        );

        if (!data) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                users: data,
                expertiseId: query.expertiseId
            },
        };

    } catch (error) {
        return {
            notFound: true,
        };
    }
}

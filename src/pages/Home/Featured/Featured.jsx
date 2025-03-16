import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import './Featured.css';

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-8 my-20">
            <SectionTitle subHeading="Check it out" heading="Featured Employee" />
            <div className="md:flex justify-center items-center bg-slate-500 bg-opacity-60 pb-20 pt-12 px-36">
                <div className="md:ml-10">
                    <p className="text-xl">Aug 20, 2029</p>
                    <p className="uppercase text-3xl font-semibold">Employee of the Month</p>
                    <p className="mt-4 text-lg">
                        This month, we are featuring an exceptional employee who has demonstrated outstanding performance in all aspects of their role.
                        From leadership to teamwork, this individual has set a remarkable example for the entire team. Their commitment to excellence is truly inspiring!
                    </p>
                    
                </div>
            </div>
        </div>
    );
};

export default Featured;

import Button from "../Button";
import Input from "../Input";
import { LinePattern, LinePatternSection } from "../icons";

export default function Hero() {
    return (
        <div className="w-full  pt-8 px-8">
            <div className="w-full from-[#53389E] to-[#6941C6] bg-gradient-to-t h-[674px] rounded-3xl flex flex-col items-center justify-center relative">
                <div className="absolute -bottom-32 -left-32">
                    <LinePattern />
                </div>
                <div className="relative -top-10">
                    <span className="text-7xl bg-clip-text text-center block bg-gradient-to-t from-purple-300 to-white text-transparent">
                        Grow your users. <br />
                        Smarter.
                    </span>
                    <span className="text-xl text-white leading-8 text-center mt-6 block">
                        Powerful, self-serve product and growth analytics to help you convert, engage, <br />
                        and retain more users. Trusted by over 4,000 startups.
                    </span>
                    <div className="flex space-x-4 w-full items-start justify-center mt-12">
                        <div>
                            <Input placeholder={"Etkinlik kodunu gir"} className={"min-w-[360px]"}>
                            </Input>
                            <span className="text-white text-sm font-normal">
                                We care about your data in our {""}
                                <span className="underline">
                                    privacy policy
                                </span>
                                .
                            </span>
                        </div>
                        <Button className={"!px-5 !py-3 font-semibold text-md max-w-[136px] !bg-[#7F56D9]"}>
                            Etkinliğe Gir
                        </Button>
                    </div>
                </div>
                <div className="absolute right-0 top-full">
                    <LinePatternSection />
                </div>
            </div>
            <div className="flex items-center justify-center !z-20 relative -top-20">
                <img src="./img/mockup.png" alt="mockup" width={"800px"} height={'492px'} />
            </div>
        </div>
    )
}
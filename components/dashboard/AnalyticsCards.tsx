import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Activity, Users, FileText } from "lucide-react";

export async function AnalyticsCards() {
    const user = await currentUser()

    const posts = await prisma.user.findUnique({
        where: { clerkId: user?.id },
        include: {
            Posts: {
                select: {
                    id: true
                }

            }
        }



    })

    const NumberOfPosts = (posts?.Posts.length)


    const stats = [
        {
            title: "Total Posts",
            value: NumberOfPosts,
            icon: <FileText className="h-4 w-4 text-muted-foreground" />,
            description: "+12% from last month",
        },
        {
            title: "Active Users",
            value: "573",
            icon: <Users className="h-4 w-4 text-muted-foreground" />,
            description: "+8.1% from last month",
        },
        {
            title: "Engagement Rate",
            value: "78.2%",
            icon: <Activity className="h-4 w-4 text-muted-foreground" />,
            description: "+3.2% from last month",
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {stat.title}
                        </CardTitle>
                        {stat.icon}
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">
                            {stat.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
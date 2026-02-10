import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await req.json();
  const data: Record<string, unknown> = {};

  if (typeof body.isActive === "boolean") {
    data.isActive = body.isActive;
  }

  const validRoles = ["ADMIN", "STAFF", "CLIENT"];
  if (body.role && validRoles.includes(body.role)) {
    data.role = body.role;
  }

  if (body.name !== undefined) {
    data.name = body.name;
  }

  const user = await prisma.user.update({
    where: { id: params.userId },
    data,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });

  return NextResponse.json(user);
}

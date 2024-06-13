<script>
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
</script>

<!-- <Titlepage titleName="Login" description="Manage the demonlist here." /> -->


<div class="flex flex-col justify-center items-center pt-28 w-screen">
    <Card.Root class="w-3/4">
        <Card.Header>
            <Card.Title>Login</Card.Title>
        </Card.Header>
        <Card.Content>
            <form class="flex flex-col gap-5" action="?/login" method="POST">
                <Label for="email">Email</Label>
                <Input name="email" id="email" placeholder="email" class="w-full" type="text"/>
                <Label for="password">Password</Label>
                <Input name="password" id="password" placeholder="password" class="w-full" type="password"/>
                <Button type="submit">Log In</Button>
            </form>
        </Card.Content>
    </Card.Root>
</div>